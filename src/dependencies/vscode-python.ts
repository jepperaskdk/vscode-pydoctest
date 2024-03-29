import { Event, Uri, WorkspaceFolder } from "vscode";

export type Resource = Uri | undefined;


// See https://github.com/microsoft/vscode-python/issues/18727 for definitions of these interfaces.
export interface EnvPathType {
    /**
     * Path to environment folder or path to interpreter that uniquely identifies an environment.
     * Virtual environments lacking an interpreter are identified by environment folder paths,
     * whereas other envs can be identified using interpreter path.
     */
    path: string;
    pathType: 'envFolderPath' | 'interpreterPath';
}

export interface ActiveEnvironmentChangedParams {
    /**
     * Path to environment folder or path to interpreter that uniquely identifies an environment.
     * Virtual environments lacking an interpreter are identified by environment folder paths,
     * whereas other envs can be identified using interpreter path.
     */
    path: string;
    resource?: Uri;
}

export type ActiveEnvironmentPathChangeEvent = EnvironmentPath & {
    /**
     * Workspace folder the environment changed for.
     */
    readonly resource: WorkspaceFolder | undefined;
};

export type EnvironmentPath = {
    /**
     * The ID of the environment.
     */
    readonly id: string;
    /**
     * Path to environment folder or path to python executable that uniquely identifies an environment. Environments
     * lacking a python executable are identified by environment folder paths, whereas other envs can be identified
     * using python executable path.
     */
    readonly path: string;
};

export interface IProposedExtensionAPI {
    environment: {
        /**
         * Returns the path to the python binary selected by the user or as in the settings.
         * This is just the path to the python binary, this does not provide activation or any
         * other activation command. The `resource` if provided will be used to determine the
         * python binary in a multi-root scenario. If resource is `undefined` then the API
         * returns what ever is set for the workspace.
         * @param resource : Uri of a file or workspace
         */
        getActiveEnvironmentPath(resource?: Resource): Promise<EnvPathType | undefined>;

        /**
         * @deprecated This event is triggered when the active environment changes.
         */
        onDidActiveEnvironmentChanged: Event<ActiveEnvironmentChangedParams>;

        /**
         * This event is triggered when the active environment setting changes.
         */
         readonly onDidChangeActiveEnvironmentPath: Event<ActiveEnvironmentPathChangeEvent>;
    }
}