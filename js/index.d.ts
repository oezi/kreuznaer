declare class Kreuznaer {
    private readonly config;
    constructor(config: 'bar' | 'deu' | 'eng' | 'fra' | 'gsw' | 'ksh' | 'lat' | 'nds' | 'nld' | 'pfl' | 'spa' | 'tur');
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
