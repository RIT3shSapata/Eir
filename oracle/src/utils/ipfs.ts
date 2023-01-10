import { create } from 'ipfs-http-client';
import { BufferList } from 'bl';

const ipfs = create();

const addFile = async (address: string, content: string) => {
    const path = `/${address}_${Date.now().toString()}`;
    const result = await ipfs.add({ path, content });
    return result;
};

const convert = async (stream: AsyncIterable<Uint8Array>): Promise<string> => {
    const content = new BufferList();
    for await (const buf of stream) {
        content.append(buf);
    }
    return content.toString();
};

const getFile = async (cid: string) => {
    // const content = new BufferList();
    // for await (const buf of ipfs.cat(cid)) {
    //     // do something with buf
    //     content.append(buf);
    // }
    // console.log(content.toString());
    // return content.toString();
    const stream = await ipfs.cat(cid);
    const val = await convert(stream);
    console.log(val);
    return val;
};

export { addFile, getFile };
