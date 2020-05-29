const encoder = new TextEncoder()

const greetText = encoder.encode('Hello World\nMy name is Sahit')

await Deno.writeFile('greet.txt', greetText);

// deno run --allow-write createFile.ts 
// as we have to grant access for write access