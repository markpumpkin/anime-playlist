import _ from 'lodash';
import { CategoryProps } from './types';

export const mapCategoryOptions = (categories: CategoryProps[]) => {
    const options: { value?: string | number; label?: string }[] = [];

    console.log('categories', categories);

    _.map(categories, category => options.push({ value: category.id, label: category.title }));

    return options;
};
