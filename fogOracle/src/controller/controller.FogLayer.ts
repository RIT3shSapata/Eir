import { Request, Response } from 'express';
import FogLayerContract from '../Blockchain/Contract';
import { PATIENT_ADDRESS } from '../utils/Constants';
import { addFile } from '../utils/ipfs';
import { genName, saveSignKey, updateRevision } from '../utils/W3Name';
import * as Name from 'w3name';
import fs from 'fs';

const addPatient = async (req: Request, res: Response) => {
    const {
        address,
        content,
        deviceID,
    }: { address: string; content: string; deviceID: number } = req.body;
    const result = await addFile(address, content);
    const cid: string = result.cid.toString();
    console.log(cid);
    const name: Name.WritableName = await genName(cid);
    saveSignKey(name, 'sign.key');
    fs.writeFileSync('name.txt', name.toString());
    await FogLayerContract.addPatient(address, deviceID);
    console.log('Patient Added and device is mapped.');
    res.send({ w3name: name.toString() });
};

const updateData = async (req: Request, res: Response) => {
    const {
        temp,
        hum,
        deviceID,
    }: { temp: number; hum: number; deviceID: number } = req.body;
    const data: string = `temp:${temp},hum:${hum}`;

    try {
        console.log('Verifying Device....');
        const verfied: boolean = await FogLayerContract.verifyDevice(
            PATIENT_ADDRESS,
            deviceID
        );
        if (verfied) {
            console.log('Device Verified!!');
            await updateRevision(data, PATIENT_ADDRESS);
            console.log('Data Updated!!');
            res.send({ verfied, msg: 'verfication successful' });
        } else {
            res.send({ verfied, msg: 'verfication unsuccessful' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ err });
    }
};

export { updateData, addPatient };
