const makeFullName = (first_name, last_name, prefix = null, suffix = null) => {
    const fName = first_name ? first_name.trim() : '';
    const lName = last_name ? last_name.trim() : '';
    const pName = prefix ? prefix.trim() : '';
    const sName = suffix ? suffix.trim() : '';
    const name = `${pName} ${fName} ${lName}${sName ? ', ' + sName : '' }`;
    return name.replace(/\s+/g, ' ').trim();
};

const createInitials = (first_name, last_name) => {
    const full_name = makeFullName(first_name, last_name);
    const name_array = full_name.split(' ');
    const initials = name_array.map(name => name.charAt(0).toUpperCase());
    return initials.join('') || 'NA';
};

const resizeBase64Image = (base64Str, maxWidth = 400, maxHeight = 400) => {
    return new Promise((resolve) => {
        let img = new Image()
        img.src = base64Str
        img.onload = () => {
            let canvas = document.createElement('canvas')
            const MAX_WIDTH = maxWidth
            const MAX_HEIGHT = maxHeight
            let width = img.width
            let height = img.height

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width
                    width = MAX_WIDTH
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height
                    height = MAX_HEIGHT
                }
            }
            canvas.width = width
            canvas.height = height
            let ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            resolve(canvas.toDataURL())
        }
    })
};

const convertBase64ImageToDataUri = (base64Str, MAX_WIDTH = 1000, MAX_HEIGHT = 1000) => {
    return new Promise((resolve) => {
        let img = new Image()
        img.src = base64Str
        img.onload = () => {
            let canvas = document.createElement('canvas')
            let width = img.width
            let height = img.height
            let scale = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height)
            canvas.width = width * scale
            canvas.height = height * scale
            let ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            resolve(canvas.toDataURL())
        }
    })
};

export {
    makeFullName,
    createInitials,
    resizeBase64Image,
    convertBase64ImageToDataUri,
};
