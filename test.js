import api from './src/client/api.js';
import axios from 'axios';
import * as fs from 'node:fs';
import https from 'https';
const BASE_PATH = 'https://localhost:7115/api';

const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

export const uploadImage = (data) => 
    instance.post(
        `${BASE_PATH}/UploadImage`,
        data,
    )
    .then((res) => res)
    .catch(error => error);

export const register = (data) => 
    instance.post(
        `${BASE_PATH}/UploadImage/Register`,
        data,
    )
    .then((res) => res)
    .catch(error => error);

// get data base 64 from image path
const getDataImage = imagePath => 'data:image/png;base64,' + fs.readFileSync(imagePath, {encoding: 'base64'});
// get all directories
const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

// main process, get file image and call api
const getAllFiles = (testFolder, namePerson) => {
    fs.readdir(testFolder, (err, files) => {
        if (err) {
            console.log(testFolder + ': ' + err);
        }
        var count = 0;
        files.forEach(file => {
            console.log(testFolder);
            // 1st file for training
            var dataImage = getDataImage(testFolder + '\\' + file);
            const data = {
                imageName: namePerson,
                imageData: [dataImage]
            };
            if (count === 0) {
                register(data)
                .then(res => {
                    console.log('register: ' + res.status);
                    recognizer(testFolder, namePerson);
                })
                .catch(error => {
                    console.log('error ' + error);
                })
            }
            count++;
        });
    });
}
var TOTAL = 0;
var SUCCESS = 0;
const recognizer = (testFolder, namePerson) => {
    fs.readdir(testFolder, (err, files) => {
        if (err) {
            console.log(testFolder + ': ' + err);
        }
        var count = 0;
        files.forEach(file => {
            console.log(testFolder + '\\' + file);
            // 1st file for training
            var dataImage = getDataImage(testFolder + '\\' + file);
            const data = {
                imageName: namePerson,
                imageData: [dataImage]
            };
            uploadImage(data)
            .then(res => {
                if (res.data == namePerson) {
                    console.log('recognizer: ' + res.data);
                    SUCCESS++;
                    console.log('SUCCESS: ' + SUCCESS + ' TOTAL: ' + TOTAL);
                }
                else {
                    console.log('recognizer error ' + testFolder + '\\' + file + ': ' + res.data);
                }
            })
            .catch(error =>{
                console.log('recognizer error: ' + error);
            })
            count++;
            TOTAL++;
        });
    });
}


// start process
const IMAGE_PATH = "D:\\document\\lfw-deepfunneled\\lfw-deepfunneled";
console.log('begin test api ai');
const listDirOfImage = getDirectories(IMAGE_PATH);
var count = 0;
for (var i in listDirOfImage) {
    getAllFiles(IMAGE_PATH + '\\' + listDirOfImage[i], listDirOfImage[i]);
    count++;
    console.log('count ' + count);
    if (count == 20 ) {break;}
}