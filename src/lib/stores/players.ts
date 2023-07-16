import { writable } from "svelte/store";
import { browser } from "$app/environment";

const localStoragePlayers = browser ? window.localStorage.players: "";


interface PlayerStore{
    players: string[]
};

const playerStore = writable<PlayerStore>(browser ?  
                                                JSON.parse(window.localStorage.getItem("players") || "")
                                                : "");



playerStore.subscribe((value) => {
    if(browser){
        window.localStorage.setItem("players", JSON.stringify(value))
    }
});

export default playerStore;

