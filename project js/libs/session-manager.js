import { tokenName } from "./constants";

export function setSessionToken(token) {
    localStorage.setItem(tokenName,token);
}
export function getSessionToken() {
    return localStorage.getItem(tokenName);
}
export function removeSessionToken(token) {
    localStorage.removeItem(tokenName);
}