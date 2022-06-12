const express = require('express');
const router = express.Router();

const Mascota = require('../models/mascota')

router.get('/', async (req, res) => {
    try { 

        const arrayMascotasDB = await Mascota.find()
        console.log(arrayMascotasDB)

        res.render("mascotas", {
            arrayMascotas: arrayMascotasDB

        })

    }catch(error){
        console.log(error)
    }


    
})

router.get('/crear', (req,res)=> {
    res.render('crear')
})

router.post('/', async (req,res) => {
    const body = req.body
    try{
       
        await Mascota.create(body)
        
        res.redirect('/mascotas')

    }catch(error){
        console.log(error)
    }
})

router.get('/:id', async(req,res) =>  {

    const id = req.params.id

    try{

        const mascotaDB = await Mascota.findOne({_id: id})
        
        res.render('detalle', { 
            mascota: mascotaDB,
            error: false
        })

    } catch(error){
        res.render('detalle', { 
           
            error: true,
            mensaje: 'No se encuentra el id seleccionado'
        })
    }
})

router.delete('/:id', async(req,res) => {
    const id = req.params.id

    try{ 
        const mascotaDB = await Mascota.findByIdAndDelete({_id:id})

        if(!mascotaDB){
            res.json({
                estado: true,
                mensaje: 'eliminado exitosamente!'
            })            
        }else{ 
            res.json({
                estado: false,
                mensaje: 'falló al eliminar'
            })         

        }

    }catch(error){
        console.log(error)
    }
})

module.exports = router;