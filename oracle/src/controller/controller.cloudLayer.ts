import { Request, Response } from 'express';
import * as Name from 'w3name';
import FogLayerContract from '../Blockchain/Contract';
import { addFile, getFile } from '../utils/ipfs';
import { genName, getCID } from '../utils/W3Name';

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
    await FogLayerContract.addPatient(address, deviceID);
    console.log('Patient Added and device is mapped.');
    res.send({ sign: name.key.bytes, name: name.toString() });
};

const getData = async (req: Request, res: Response) => {
    const { id }: { id: string } = req.body;
    const cid = await getCID(id);
    const result = await getFile(cid);
    res.send({ res: result });
};

export { addPatient, getData };
