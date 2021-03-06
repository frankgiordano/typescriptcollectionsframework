/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
export interface Consumer<T> {
    /**
     * Performs this operation on the given argument
     * @param {T} t the input argument
     */
    accept(t: T): void;
}
