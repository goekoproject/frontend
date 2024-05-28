import { Observable } from "rxjs";

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
export interface CanAnalysisDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;

    saveAnalysis :() => Observable<boolean>;
}