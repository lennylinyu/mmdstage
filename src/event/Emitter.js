/**
 * Created by on 2017/4/19.
 */
export default class Emitter
{
    constructor()
    {
        var delegate = document.createDocumentFragment();
        [
            'addEventListener',
            'dispatchEvent',
            'removeEventListener'
        ].forEach(f =>
            this[f] = (...xs) => delegate[f](...xs)
        )

    }
}