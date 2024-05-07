import _ from 'lodash';
import { dataFullName } from './data';
import { CategoryProps, VideoProps } from '../../helpers/types';

export const getCategoriesOptions = (categories: string[]) => {
    const data: CategoryProps[] = [];
    _.each(categories, (category, index) => {
        const temp: CategoryProps = {
            id: index,
            slug: category,
            title: dataFullName[category],
            thumbnail: '',
            description: ''
        };
        data.push(temp);
    });

    return data;
};
