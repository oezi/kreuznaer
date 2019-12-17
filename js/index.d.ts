declare class Kreuznaer {
    private readonly config;
    constructor(config: 'deu' | 'eng');
    private getData;
    private randomEntry;
    private generate;
    private generateSomething;
    private generateWord;
    private generateSentence;
    private generateName;
    private generateFamilyName;
    private generateNickName;
    getWord(): string;
    getSentence(): string;
    getName(gender?: 'm' | 'f'): any;
    getFamilyName(): any;
    getNickName(): any;
}
export default Kreuznaer;
