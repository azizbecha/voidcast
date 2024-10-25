import React, { useState } from 'react';

import Select from 'react-select';
import toast from 'react-hot-toast';

import categoriesData from '../../utils/categories.json';

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

const formatCategories = (data: CategoriesData): FormattedCategory[] => {
    return Object.entries(data).map(([label, options]) => ({
        label,
        options: options.map(option => ({
            value: option,
            label: option
        }))
    }));
};

const formatGroupLabel = (data: any) => (
    <div className='flex items-center justify-between'>
        <span className='font-semibold'>{data.label}</span>
        <span className='bg-primary-700 rounded-lg text-primary-100 inline-block text-xs font-semibold min-w-1 px-2 py-0.5 text-center'>{data.options.length}</span>
    </div>
);

const customStyles = {
    control: (styles: any) => ({
        ...styles,
        backgroundColor: '#242c37',
        color: '#dee3ea',
        borderRadius: '8px',
        borderColor: '#000',
        padding: '2px 10px',
    }),
    placeholder: (styles: any) => ({
        ...styles,
        color: '#5d7290',
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
        ...styles,
        backgroundColor: isSelected ? '#2c3e50' : isFocused ? '#1e2a35' : '#151a21',
        color: '#dee3ea',
        cursor: 'pointer',
        fontSize: 14
    }),
    singleValue: (styles: any) => ({
        ...styles,
        color: '#dee3ea',
    }),
    menu: (styles: any) => ({
        ...styles,
        backgroundColor: '#151a21',
    }),
    menuList: (styles: any) => ({
        ...styles,
    }),
    groupHeading: (styles: any) => ({
        ...styles,
        backgroundColor: '#323d4d',
        color: '#dee3ea',
        position: 'sticky',
        top: 0,
        padding: 10
    }),
    multiValue: (styles: any) => ({
        ...styles,
        backgroundColor: '#fd4d4d',
    }),
    multiValueLabel: (styles: any) => ({
        ...styles,
        color: '#dee3ea',
        fontWeight: '600'
    }),
    multiValueRemove: (styles: any) => ({
        ...styles,
        color: '#dee3ea',
        ':hover': {
            backgroundColor: '#fd4d4d',
            color: '#fff',
        },
    }),
};

const formattedCategories = formatCategories(categoriesData);

const CategorySelector = ({ onCategoryChange }: { onCategoryChange: (categories: string[]) => void }) => {

    const [selectedCategories, setSelectedCategories] = useState<CategoryOptions[]>([]);
    const MAX_CATEGORIES = 5;

    const handleCategoryChange = (selected: any) => {
        if (selectedCategories && selected.length > MAX_CATEGORIES) {
            toast.error("You can only select up to 5 categories.");
            return; // Prevent further execution if limit is exceeded
        }

        setSelectedCategories(selected || []); // Update state with new selection
        const categoryValues = selected ? selected.map((opt: CategoryOptions) => opt.value) : [];
        onCategoryChange(categoryValues); // Pass updated values to parent component
    };


    return (
        <Select
            options={formattedCategories}
            className='z-50'
            placeholder="Please select categories"
            formatGroupLabel={formatGroupLabel}
            styles={customStyles}
            isSearchable
            isClearable
            isMulti
            onChange={handleCategoryChange}
            backspaceRemovesValue
        />
    );
};

export default CategorySelector;
