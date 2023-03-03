import { QueryParamValue } from "@customTypes/QueryParamValue";
import { action, makeObservable, observable } from "mobx";
import * as qs from "qs";

type PrivateFields = "_params";

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _searchQuery: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearchQuery: action,
    });
  }

  getParam(key: string): QueryParamValue {
    return this._params[key];
  }

  setSearchQuery(searchQuery: string) {
    if (this._searchQuery !== searchQuery) {
      this._searchQuery = searchQuery;
      this._params = qs.parse(searchQuery, { ignoreQueryPrefix: true });
    }
  }
}
