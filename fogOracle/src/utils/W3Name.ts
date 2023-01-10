import * as Name from 'w3name';
import fs from 'fs';
import { addFile, getFile } from './ipfs';

const genName = async (cid: string): Promise<Name.WritableName> => {
    const name = await Name.create();
    const value: string = `/ipfs/${cid}`;
    const revision: Name.Revision = await Name.v0(name, value);
    await Name.publish(revision, name.key);
    return name;
};

const getCID = async (id: string): Promise<string> => {
    const name: Name.Name = await Name.parse(id);
    const revision: Name.Revision = await Name.resolve(name);
    const cid: string = revision.value.split('/')[2];
    return cid;
};

const saveSignKey = async (
    name: Name.WritableName,
    outputFileName: string
): Promise<void> => {
    const bytes: Uint8Array = name.key.bytes;
    await fs.promises.writeFile(outputFileName, bytes);
};

const loadSignKey = async (filename: string): Promise<Name.WritableName> => {
    const bytes: Uint8Array = await fs.promises.readFile(filename);
    const name: Name.WritableName = await Name.from(bytes);
    return name;
};

const updateRevision = async (data: string, address: string) => {
    const nameID: string = await fs.readFileSync('name.txt', 'utf-8');
    const name: Name.Name = await Name.parse(nameID);
    const revision: Name.Revision = await Name.resolve(name);
    const value: string = revision.value;
    const cid: string = value.split('/')[2];
    console.log('works', cid);
    const oldData: string = await getFile(cid);
    const newData: string = oldData + data;
    const res = await addFile(address, newData);
    const newCID = res.cid.toString();
    const nameObj: Name.WritableName = await loadSignKey('sign.key');
    const newValue: string = `/ipfs/${newCID}`;
    const nextRevision: Name.Revision = await Name.increment(
        revision,
        newValue
    );
    await Name.publish(nextRevision, nameObj.key);
};

export { genName, getCID, updateRevision, saveSignKey };
