import {clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

//class+ tailwind merge
export function cn(...inputs){
    return twMerge(clsx(inputs));
}
//num with comma formatting
export function formatNumber(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
//%
export function formatPercent(num){
    return `${Math.round(num* 100)}%`;
}
//decimal to 3 places for batting average
export function formatAvg(num){
    return num.toFixed(3).toString().substring(1);
}
//num bet min and max
export function randomBetween(min, max){
    return Math.floor(Math.random()*(max- min+ 1)+ min);
}
//date
export function formatDate(date){
    const options= {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date(date).toLocaleDateString(undefined, options);
}