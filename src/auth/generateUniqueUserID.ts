export default function generateUniqueUserID(): string {
    // Fonction pour générer un GUID (Globally Unique Identifier)
    function generateGUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Générer un GUID
    const guid = generateGUID();

    // Combiner le GUID avec un préfixe
    const uniqueID = `UID-${guid}`;

    return uniqueID;
}

