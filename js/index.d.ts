declare class Kreuznaer {
    private readonly config;
    constructor(config: 'bar' | 'deu' | 'eng' | 'fra' | 'gsw' | 'ksh' | 'lat' | 'nds' | 'nld' | 'pfl' | 'spa' | 'tur');
    private getData;
    private generate;
    private generateSomething;
    private generateWord;
    private generateSentence;
    private generateNickname;
    getWord(): string;
    getSentence(): string;
    getNickname(): string;
}
export default Kreuznaer;
