import { Profile } from "@goeko/store";

export interface ProfileFieldset<T> {
    legend: string;
    textSupport?: string;
    fields: Array<Profile<T>>
}