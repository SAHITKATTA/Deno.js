let file  = await Deno.open('greet.txt')   //await because its a promise
await Deno.copy(file, Deno.stdout)
file.close()

// deno run --allow-read readFile.ts
// as we have to grant access for read access