import { MouseEvent } from 'react';
import _ from 'lodash';
import './Item.css';
import { VideoProps } from '../../../../helpers/types';

export type ItemProps = VideoProps & {
    onClick?: (item: VideoProps) => void;
    isSelected?: boolean;
    defaultThumbnail?: string;
};

function Item(props: ItemProps) {
    const { label, source, value, thumbnail, defaultThumbnail, timestamp, isSelected, onClick } = props;

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        event.stopPropagation();
        _.isFunction(onClick) && onClick(props);
    };

    return (
        <li className={isSelected ? 'list-item-link _isSelected' : 'list-item-link'}>
            {source === 'youtube' && (
                <a
                    target="_blank"
                    className="link-youtube _watchinyoutube"
                    href={`https://www.youtube.com/watch?v=${value}`}
                    rel="noreferrer"
                    onClick={() => _.isFunction(onClick) && onClick(props)}
                >
                    {timestamp && <span className="timestamp">{timestamp}</span>}
                    {thumbnail ? (
                        <img src={thumbnail} loading="lazy" alt={label} width="100%" />
                    ) : defaultThumbnail ? (
                        <img src={defaultThumbnail} loading="lazy" alt={label} width="100%" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                        </svg>
                    )}
                </a>
            )}
            {source === 'link' && (
                <a target="_blank" className="link-youtube" href={value} rel="noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                    </svg>
                </a>
            )}
            <a href="/video-source.html" title={label} className="label" onClick={handleClick}>
                <span className="text-clamp">{label?.substring(label.indexOf('|') + 2)}</span>
            </a>
        </li>
    );
}

export default Item;
