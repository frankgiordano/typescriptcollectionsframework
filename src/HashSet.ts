/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import {AllFieldHashable} from "./AllFieldHashable";
import {BasicIteratorResult} from "./BasicIteratorResult";
import {Consumer} from "./Consumer";
import {JIterator} from "./JIterator";
import {Hashable} from "./Hashable";
import {HashMap} from "./HashMap";
import {HashMapIteratorLocationTracker} from "./HashMap";
import {ImmutableCollection} from "./ImmutableCollection";
import {ImmutableSet} from "./ImmutableSet";
import {JSet} from "./JSet";
import {LinkedHashMap} from "./LinkedHashMap";

/**
 * This class implements the Set interface, backed by a HashMap instance.
 *
 * It makes no guarantees as to the iteration order of the set; in particular, it does not guarantee that the order will remain constant over time.
 * This class permits the null element.
 *
 * This class offers constant time performance for the basic operations (add, remove, contains and size),
 * assuming the hash function disperses the elements properly among the buckets. <br>
 * Iterating over this set requires time proportional to the sum of the HashSet instance's size
 * (the number of elements) plus the "capacity" of the backing HashMap instance (the number of buckets). <br>
 * Thus, it's very important not to set the initial capacity too high (or the load factor too low) if iteration performance is important.
 *
 * This class corresponds to java.util.HashSet
 */
export class HashSet<K> implements JSet<K> {

  private datastore:HashMap<K,number> = null;
  private hashMethods:Hashable<K>;

  constructor(iHash:Hashable<K> = AllFieldHashable.instance, private initialElements:ImmutableCollection<K> = null, private iInitialCapacity:number=20, private iLoadFactor:number=0.75) {
    this.hashMethods = iHash;
    this.datastore = new HashMap<K,number>(this.hashMethods, null, iInitialCapacity, iLoadFactor);
    if ((initialElements !== null) && (initialElements !== undefined)){
      for (const iter = initialElements.iterator(); iter.hasNext(); ) {
        const t:K = iter.next ();
        this.add (t);
      }
    }
  }

  /**
  * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception. Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified). Exceptions thrown by the action are relayed to the caller.
  * @param {Consumer} consumer - the action to be performed for each element
  */
  public forEach(consumer:Consumer<K>) : void {
   for (const iter:JIterator<K> = this.iterator(); iter.hasNext(); ) {
     const t:K = iter.next();
     consumer.accept(t);
   }
  }

  /**
  * Returns the Hashable
  * @return {Hashable}
  */
  public getHashable () : Hashable<K> {
    return this.hashMethods;
  }

  /**
  * Adds the specified element to this set if it is not already present.
  * @param {K} element element to be added to this set
  * @return {boolean} true if this set did not already contain the specified element
  */
  public add (element:K) : boolean {
    const tmp:number = this.datastore.put(element, 1);
    if (tmp === undefined) {
      return true;
    }

    return false;
  }

  /**
  * RemoveElement the specified element from this set if it is present.
  * @param {K} element element to be removed from this set
  * @return {boolean} true if the set contained the specified element
  */
  public remove (element:K) : boolean {
    const tmp:number = this.datastore.remove(element);
    if (tmp === null) {
      return false;
    }

    return true;
  }

  /**
  * Returns the number of elements in this set (its cardinality).
  * @return {number} the number of elements in this set (its cardinality)
  */
  public size () : number {
    if (this.datastore === null)
      return 0;
    return this.datastore.size();
  }

  /**
  * Returns true if this set contains no elements.
  * @return {boolean} true if this set contains no elements
  */
  public isEmpty () : boolean {
    if (this.datastore === null)
      return true;
    const tmp:number = this.datastore.size();
    if (tmp === 0)
      return true;
    return false;
  }

  /**
  * Returns true if this set contains the specified element.   This method uses the comparator and does not invoke equals
  * @param {K} item object to be checked for containment in this set
  * @return {boolean} true if this set contains the specified element
  */
  public contains (item:K) : boolean {
    const tmp:number = this.datastore.get(item);
    if ((tmp === null) || (tmp === undefined))
      return false;
    return true;
  }

  /**
  * Removes all of the elements from this set. The set will be empty after this call returns.
  */
  public clear () : void {
    return this.datastore.clear();
  }

  /**
  * This method is deprecated and will be removed in a future revision.
  * @deprecated
  */
  public deprecatedGetFirstEntryForIterator ():HashMapIteratorLocationTracker<K,number> {
    return this.datastore.deprecatedGetFirstEntryForIterator();
  }

  /**
   * This method is deprecated and will be removed in a future revision.
   * @deprecated
  */
  public deprecatedGetNextEntryForIterator (current:HashMapIteratorLocationTracker<K,number>):HashMapIteratorLocationTracker<K,number> {
    return this.datastore.deprecatedGetNextEntryForIterator(current);
  }

 /**
  * Returns a Java style iterator
  * @return {JIterator<K>} the Java style iterator
  */
  public iterator():JIterator<K> {
    return new HashSetJIterator(this);
  }

  /**
  * Returns a TypeScript style iterator
  * @return {Iterator<K>} the TypeScript style iterator
  */
  public [Symbol.iterator] ():Iterator<K> {
    return new HashSetIterator (this);
  }

  /**
  * Returns an ImmutableCollection backed by this Collection
  */
  public immutableCollection () : ImmutableCollection<K> {
    return this;
  }

  /**
  * Returns an ImmutableSet backed by this Set
  */
  public immutableSet () : ImmutableSet<K> {
    return this;
  }
}


/* Java style iterator */
export class HashSetJIterator<T> implements JIterator<T> {
  private location:HashMapIteratorLocationTracker<T,number>;
  private set:HashSet<T>;

  constructor (iSet:HashSet<T>) {
    this.set = iSet;
  }

  public hasNext():boolean {
    if (this.location === undefined) { // first time caller
      const first:HashMapIteratorLocationTracker<T,number> = this.set.deprecatedGetFirstEntryForIterator();
      if (first === undefined) {
        return false;
      }
      if (first === null) {
        return false;
      }
      return true;
    } else { // we've already called this iterator before
      const tmp:HashMapIteratorLocationTracker<T,number> = this.set.deprecatedGetNextEntryForIterator(this.location);
      if (tmp === null) {
        return false;
      } else {
        return true;
      }
    }
  }

  public next():T {
    if (this.location === undefined) { // first time caller
      const first:HashMapIteratorLocationTracker<T,number> = this.set.deprecatedGetFirstEntryForIterator();
      if (first === undefined) {
        return null;
      }
      if (first === null) {
        return null;
      }
      this.location = first;
      return first.entry.getKey();
    } else { // we've already called this iterator before
      const tmp:HashMapIteratorLocationTracker<T,number> = this.set.deprecatedGetNextEntryForIterator(this.location);
      if (tmp === null) {
        return null;
      } else {
        this.location = tmp;
        return tmp.entry.getKey();
      }
    }
  }
}

/* TypeScript iterator */
export class HashSetIterator<T> implements Iterator<T> {
  private location:HashMapIteratorLocationTracker<T,number>;
  private set:HashSet<T>;

  constructor (iSet:HashSet<T>) {
    this.set = iSet;
    this.location = this.set.deprecatedGetFirstEntryForIterator();
  }

  // tslint:disable-next-line:no-any
  public next(value?: any): IteratorResult<T> {
    if (this.location === null) {
      return new BasicIteratorResult(true, null);
    }
    if (this.location === undefined) {
      return new BasicIteratorResult(true, null);
    }
    const tmp:BasicIteratorResult<T> = new BasicIteratorResult (false, this.location.entry.getKey());
    this.location = this.set.deprecatedGetNextEntryForIterator(this.location);
    return tmp;
  }
}
