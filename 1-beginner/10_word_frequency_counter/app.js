const cleanInput = (str) =>
  str
    .replace(/[?.!,"\(\)]/g, '')
    .replace(/[ ]{2,}/g, '')
    .trim()
    .toLowerCase()

// odd tr classes - hover:bg-zinc-300 bg-zinc-200
// even tr classes - hover:bg-zinc-300
// td classes - p-2 border text-lg
