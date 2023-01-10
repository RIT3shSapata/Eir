import * as Name from 'w3name';

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

export { genName, getCID };
