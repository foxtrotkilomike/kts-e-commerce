import { DEFAULT_CATEGORY_ID, DEFAULT_FILTER_VALUE } from "@config/constants";
import { ILocalStore } from "@customTypes/ILocalStore";
import { Option } from "@customTypes/Option";
import { getAllCategories } from "@services/categories";
import {
  CategoryModelApi,
  normalizeCategoriesToOptions,
} from "@store/models/platziStore";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_options" | "_selectedOptionKey" | "_setOptions";

export default class SearchOptionsStore implements ILocalStore {
  private _options: Option[] = [];
  private _selectedOptionKey: Option["key"];
  private _resetOption: Option = {
    key: DEFAULT_CATEGORY_ID,
    value: DEFAULT_FILTER_VALUE,
  };

  constructor(initOption: number) {
    makeObservable<SearchOptionsStore, PrivateFields>(this, {
      _options: observable.ref,
      _selectedOptionKey: observable,
      options: computed,
      selectedOption: computed,
      setSelectedOption: action.bound,
      _setOptions: action,
    });
    this._selectedOptionKey = initOption;
    this._setOptions();
  }

  get options(): Option[] {
    return this._options;
  }

  get selectedOption(): Option["key"] {
    return this._selectedOptionKey;
  }

  setSelectedOption(option: Option["key"]): void {
    this._selectedOptionKey = option;
  }

  private async _setOptions(): Promise<void> {
    const response = await getAllCategories();

    if (!response || "code" in response) return;

    const normalizedOptions = normalizeCategoriesToOptions(
      response as CategoryModelApi[]
    );
    this._options = [this._resetOption, ...normalizedOptions];
  }

  destroy() {}
}
