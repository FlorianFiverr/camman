const fs = require("fs");
const { dialog } = require('electron').remote;

let pdf_path = null;

function saveSettings(){
    const cad_folder = document.getElementById('cad_folder').value;
    const prefix = document.getElementById('prefix').value;
    const jobs_folder = document.getElementById('jobs_folder').value;
    if(!cad_folder || !prefix || !jobs_folder){
        alert('please fill all fields!');
        return;
    }
    localStorage.setItem('cad_folder', cad_folder);
    localStorage.setItem('prefix', prefix);
    localStorage.setItem('jobs_folder', jobs_folder);

    if(pdf_path){
        localStorage.setItem('pdf_path', pdf_path);
    }

}

function loadSettings(){
    document.getElementById('cad_folder').value = localStorage.getItem('cad_folder');
    document.getElementById('prefix').value = localStorage.getItem('prefix');
    document.getElementById('jobs_folder').value = localStorage.getItem('jobs_folder');
}

document.getElementById('pdf_location').addEventListener('click', () => {
    pdf_path = dialog.showOpenDialog({ openFile: true });
});
function createDirectories(){
    const job_number = document.getElementById('job_number').value;
    const job_name = document.getElementById('job_name').value;
    const cad_folder = localStorage.getItem('cad_folder');
    const prefix = localStorage.getItem('prefix');
    const jobs_folder = localStorage.getItem('jobs_folder');
    const pdf_path = localStorage.getItem('pdf_path');
    if(!job_number || !job_name || !cad_folder || !prefix || !jobs_folder || !pdf_path){
        alert('some information is missing');
        return;
    }

    fs.mkdir(cad_folder + '/' + prefix + job_number + ' ' + job_name, { recursive: false}, () => {});
    fs.mkdir(jobs_folder + '/' + job_number + ' ' + job_name, { recursive: true}, (err) => {
        console.log(err)
        fs.mkdir(jobs_folder + '/' + job_number + ' ' + job_name + '/PURCHASE', { recursive: true}, (err) => {
            console.log(pdf_path[0])
            fs.copyFile(pdf_path[0], jobs_folder + '/' + job_number + ' ' + job_name + '/PURCHASE/' + job_number + ' Production Planning.png', (err) => {
                if (err) throw err;

                //TODO: desktop shortcuts
            });
        });
    });
}