const express=require('express');
const multer=require('multer');
const XLSX=require('xlsx');
const path=require('path')
const fs=require('fs');

const app=express();
const PORT=3000;

app.use(express.static('public'));
const upload=multer({dest:'upload/'})


app.post('/upload',upload.single('excel'),(req,res)=>{
    try{
    const filepath=req.file.path;
    const workbook=XLSX.readFile(filepath);
    
    const result={};
    workbook.SheetNames.forEach(sheetName =>{
        const worksheet=workbook.Sheets[sheetName];
        const jsonData=XLSX.utils.sheet_to_json(worksheet);
        result[sheetName]=jsonData
    });

    

    fs.unlinkSync(filepath);
    
    /*res.setHeader('Content-type','text/plain')*/
    res.json(result);
}
catch(err)
{
    console.error(err);
    res.status(500).send('Error Excel file ')
}
});
app.listen(3000,() =>{
    console.log('Server running at http://localhost:3000')
});