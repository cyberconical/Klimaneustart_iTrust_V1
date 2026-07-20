// Full column list mirrors the Conversation schema plus Mongoose-added metadata,
// so the export always contains every stored field, not just what the UI renders.
const COLUMNS = [
    '_id',
    'uuid',
    'status',
    'user',
    'notes',
    'mainInterest',
    'livableCity',
    'topicDetails',
    'districts',
    'selectedInitiatives',
    'interestAreas',
    'observerReflection',
    'surprise',
    'numPeople',
    'duration',
    'location',
    'createdAt',
    'updatedAt',
    '__v',
];

const formatCell = (value) => {
    if (value === undefined || value === null) return '';
    if (value instanceof Date) return value.toISOString();
    if (Array.isArray(value)) return value.join('; ');
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
};

const escapeCell = (value) => {
    const str = formatCell(value);
    if (/["\n,]/.test(str)) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
};

const toCsv = (rows) => {
    const lines = [COLUMNS.join(',')];
    for (const row of rows) {
        lines.push(COLUMNS.map((col) => escapeCell(row[col])).join(','));
    }
    return lines.join('\n');
};

export { toCsv };
