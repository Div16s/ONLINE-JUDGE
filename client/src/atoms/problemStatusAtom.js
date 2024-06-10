import {atom} from 'recoil';

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

export const problemStatusAtom = atom({
    key: 'problemStatusAtom',
    default: userInfo ? userInfo.solvedProblems : '[]'
});