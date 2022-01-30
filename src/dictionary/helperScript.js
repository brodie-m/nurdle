import fs from 'fs'
import {fullDictionary} from './dictionary.js'

const deleteValues = (obj,n) => {
    for (let key in obj) {
        if (key.length !== n) {
            delete obj[key]
        }
        else {
            obj[key] = ""
        }
        
        
    }
    return JSON.stringify(obj)
}
const callback = () => {
    console.log('done')
}
fs.writeFile('6dict.json',deleteValues(fullDictionary,6),'utf-8',callback)

export const something = 'nothing'