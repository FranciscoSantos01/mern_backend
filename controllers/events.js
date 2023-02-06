const {response} = require('express');
const Event = require('../models/event')

const getEvents = async(req, res=response)=>{
     try{
        const events = await Event.find()
                                .populate('user', 'name')
        return res.status(200).json({
            ok:true,
            events
        })
     }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "Communicate with the admin"
        })
     }
}
const createEvents = async(req, res=response)=>{
    const event = new Event(req.body);

    try{
         event.user = req.uid;

         const saveEvent = await event.save()


       return res.status(200).json({
           ok:true,
           msg:"event created",
           event: saveEvent
       })
    }catch(error){
       console.log(error)
       return res.status(500).json({
           ok:false,
           msg: "Communicate with the admin"
       })
    }
}

const updateEvents = async(req, res=response)=>{
    const eventId = req.params.id
    try{
        const event = await Event.findById(eventId);
        if(!event){
           return res.status(404).json({
                ok:false,
                msg: "Not found"
            })
        };

        if(event.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'not have permits to edit'
            })
        };
        const newEvent={
            ...req.body,
            user: req.uid
        };
        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {new: true})
       return res.status(200).json({
           ok:true,
           event: eventUpdated
       })
    }catch(error){
       console.log(error)
       return res.status(500).json({
           ok:false,
           msg: "Communicate with the admin"
       })
    }
}

const deleteEvent = async(req, res=response)=>{
    const eventId = req.params.id
    try{
        const event = await Event.findById(eventId)

        if(!event){
            return res.status(404).json({
                ok:false,
                msg: "Not found"
            })
        };
       
        if(event.user.toString() !== req.uid){
            return res.status(401).json({
                ok:false,
                msg:"not authorized to delete"
            })
        }
        
        await Event.findByIdAndDelete(eventId)

       return res.status(200).json({
           ok:true,
           msg:"Event deleted"
       })
    }catch(error){
       console.log(error)
       return res.status(500).json({
           ok:false,
           msg: "Communicate with the admin"
       })
    }
}








module.exports={
    getEvents,
    createEvents,
    updateEvents,
    deleteEvent
}