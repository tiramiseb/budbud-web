import { writable } from 'svelte/store';

export const user = writable({loggedin:false});