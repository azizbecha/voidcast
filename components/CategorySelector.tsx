import React, { useState } from "react";
import Select, { GroupBase, StylesConfig, MultiValue } from "react-select";
import { toast } from "sonner";

import categoriesData from "@/utils/categories.json";

type CategoryOptions = {
  value: string;
  label: string;
};

type FormattedCategory = {
  label: string;
  options: CategoryOptions[];
};

type CategoriesData = {
  [key: string]: string[];
};

interface Props {
  onCategoryChange: (categories: string[]) => void;
  disabled?: boolean;
  loading?: boolean;
}

const formatCategories = (data: CategoriesData): FormattedCategory[] => {
  return Object.entries(data).map(([label, options]) => ({
    label,
    options: options.map((option) => ({
      value: option,
      label: option,
    })),
  }));
};

const formatGroupLabel = (group: GroupBase<CategoryOptions>) => (
  <div className="flex items-center justify-between">
    <span className="font-semibold">{group.label ?? ""}</span>
    <span className="bg-primary-700 rounded-lg text-primary-100 inline-block text-xs font-semibold min-w-1 px-2 py-0.5 text-center">
      {group.options?.length ?? 0}
    </span>
  </div>
);

// Type-safe styles config for react-select
const customStyles: StylesConfig<
  CategoryOptions,
  true,
  GroupBase<CategoryOptions>
> = {
  valueContainer: (styles) => ({
    ...styles,
    display: "flex",
    flexWrap: "nowrap", // Prevent wrapping
    overflowX: "auto", // Enable horizontal scroll
    overflowY: "hidden",
    maxWidth: "100%", // Ensure it doesn’t exceed container
    paddingBottom: 4, // Adjust spacing as needed
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: "#242c37",
    color: "#dee3ea",
    borderRadius: "8px",
    borderColor: "#000",
    padding: "2px 4px",
    overflow: "hidden",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "#5d7290",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? "#2c3e50" : isFocused ? "#1e2a35" : "#151a21",
    color: "#dee3ea",
    cursor: "pointer",
    fontSize: 14,
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#dee3ea",
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "#151a21",
  }),
  menuList: (styles) => ({
    ...styles,
  }),
  groupHeading: (styles) => ({
    ...styles,
    backgroundColor: "#323d4d",
    color: "#dee3ea",
    position: "sticky",
    top: 0,
    padding: 10,
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "#fd4d4d",
    fontSize: 14,
    flex: "0 0 auto",
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "#dee3ea",
    fontWeight: "600",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 100,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "#dee3ea",
    ":hover": {
      backgroundColor: "#fd4d4d",
      color: "#fff",
    },
  }),
};

const formattedCategories = formatCategories(categoriesData);

const CategorySelector: React.FC<Props> = ({
  onCategoryChange,
  disabled,
  loading,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<
    CategoryOptions[]
  >([]);
  const MAX_CATEGORIES = 5;

  const handleCategoryChange = (selected: MultiValue<CategoryOptions>) => {
    if (selected.length > MAX_CATEGORIES) {
      toast.error("Error", {
        description: "You can only select up to 5 categories.",
      });
      return;
    }

    setSelectedCategories(Array.from(selected));
    onCategoryChange(selected.map((opt) => opt.value));
  };

  return (
    <Select<CategoryOptions, true, GroupBase<CategoryOptions>>
      options={formattedCategories}
      className="z-50 hover:border-none"
      placeholder="Please select categories"
      formatGroupLabel={formatGroupLabel}
      styles={customStyles}
      isDisabled={disabled}
      isLoading={loading}
      isSearchable
      isClearable
      isMulti
      blurInputOnSelect
      closeMenuOnSelect={false}
      value={selectedCategories}
      onChange={handleCategoryChange}
      backspaceRemovesValue
    />
  );
};

export default CategorySelector;
