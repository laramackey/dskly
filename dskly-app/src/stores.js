import { readable, writable } from 'svelte/store';

export const currentDate = writable('2020-11-26');
export const apiUrl = readable('http://3.250.193.33:8080/');
