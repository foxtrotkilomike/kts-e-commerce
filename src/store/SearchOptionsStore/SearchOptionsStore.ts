import { ILocalStore } from "@customTypes/ILocalStore";
import { Option } from "@customTypes/Option";
import { getAllCategories } from "@services/categories";
import {
  CategoryModelApi,
  normalizeCategoriesToOptions,
} from "@store/models/platziStore";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_options" | "_selectedOption" | "_setOptions";

export default class SearchOptionsStore implements ILocalStore {
  private _options: Option[] = [];
  private _selectedOption: Option["key"];

  constructor(initOption: number) {
    this._selectedOption = initOption;
    makeObservable<SearchOptionsStore, PrivateFields>(this, {
      _options: observable.ref,
      _selectedOption: observable,
      options: computed,
      selectedOption: computed,
      setSelectedOption: action.bound,
      _setOptions: action,
    });
    this._setOptions();
  }

  get options(): Option[] {
    return this._options;
  }

  get selectedOption(): Option["key"] {
    return this._selectedOption;
  }

  setSelectedOption(option: Option["key"]): void {
    this._selectedOption = option;
  }

  private async _setOptions(): Promise<void> {
    const response = await getAllCategories();

    if (!response || "code" in response) return;

    this._options = normalizeCategoriesToOptions(
      response as CategoryModelApi[]
    );
  }

  destroy() {}
}
