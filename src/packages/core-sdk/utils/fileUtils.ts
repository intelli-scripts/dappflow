export async function getFileContent(file: File): Promise<any> {
    const promise = new Promise(function(resolve, reject) {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            const content = fileReader.result;
            resolve(content);
        };
        fileReader.readAsText(file);
    });

    return promise;
}