export default class ABIConfig {

    setAppId(id: string) {
        localStorage.setItem('abi_app_id', id);
    }

    getAppId(): string {
        return localStorage.getItem('abi_app_id');
    }
}