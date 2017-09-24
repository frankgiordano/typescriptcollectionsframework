/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {Collection} from "./Collection";

export interface Queue<K> extends Collection<K> {
  // A very talented volunteer stepped up to write Queue.   Im preparing some files for him.   Thank you very much!

  /**
  * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions, returning true upon success
  * and returning false if no space is currently available or if the implementation does not permit duplicates and already contains the specified element
  */
  add (k:K) : boolean;

  /**
  * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions.
  */
  offer (k:K) : boolean;

  /*
  * Retrieves and removes the head of this queue, or returns null if this queue is empty.
  */
  poll () : K;

  /*
  * Retrieves and removes the head of this queue. This method differs from poll only in that it returns undefined if this queue is empty
  */
  removeQueue () : K;

  /*
  * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
  */
  peek () : K;

  /*
  * Retrieves, but does not remove, the head of this queue. This method differs from peek only in that it returns undefined if this queue is empty.
  */
  element () : K;
}
