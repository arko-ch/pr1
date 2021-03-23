import namor from "namor";
import moment from "moment";

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newPerson = () => {
    const statusChance = Math.random();
    return {
        firstName: namor.generate({ words: 1, numbers: 0 }),
        lastName: namor.generate({ words: 1, numbers: 0 }),
        age: Math.floor(Math.random() * 30),
        visits: Math.floor(Math.random() * 100),
        progress: Math.floor(Math.random() * 100),
        status:
            statusChance > 0.66
                ? "relationship"
                : statusChance > 0.33 ? "complicated" : "single"
    };
};

const fileNames = ['NJ-AF93782', 'NJ-A4827', 'NY-P9348', 'NY-A0391'];
const vendors = ['Scalable Legal Services, LLC', 'Data Company 123, Inc.'];
const searches = ['County', 'Chancery', 'Upper Courts'];

const newSearch = () => {
    const statusChance = Math.random();
    return {
        transfer: fileNames[Math.floor(Math.random()*fileNames.length)],
        search: searches[Math.floor(Math.random()*searches.length)],
        vendor: vendors[Math.floor(Math.random()*vendors.length)],
        contact: namor.generate({ words: 1, numbers: 0 }) + "@test.com",
        status:

            statusChance > 0.5 ? "Very Late" : "Late",

        orderDate:  moment(new Date(new Date(2012, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2012, 0, 1).getTime()))).format('MM/DD/YYYY'),
        expectedDate: "3 days"
    };
};

const newSearch2 = () => {
    const statusChance = Math.random();
    return {
        transfer: fileNames[Math.floor(Math.random()*fileNames.length)],
        search: searches[Math.floor(Math.random()*searches.length)],
        vendor: vendors[Math.floor(Math.random()*vendors.length)],
        contact: namor.generate({ words: 1, numbers: 0 }) + "@test.com",
        status:
            statusChance > 0.8 ? "Today" : statusChance > 0.6 ? "Tomorrow" : "Ordered",
        orderDate: moment(new Date(new Date(2012, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2012, 0, 1).getTime()))).format('MM/DD/YYYY'),
        expectedDate: "3 days"
    };
};

const newSearch3 = () => {
    return {
        transfer: fileNames[Math.floor(Math.random()*fileNames.length)],
        search: searches[Math.floor(Math.random()*searches.length)],
        vendor: vendors[Math.floor(Math.random()*vendors.length)],
        contact: namor.generate({ words: 1, numbers: 0 }) + "@test.com",
        status: "Pending Order",
        orderDate: moment(new Date(new Date(2012, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2012, 0, 1).getTime()))).format('MM/DD/YYYY'),
        expectedDate: "3 days"
    };
};
export function makeData(len = 5553) {
    return range(len).map(d => {
        return {
            ...newPerson(),
            children: range(10).map(newPerson)
        };
    });
}

export function makeData2(len = 5553) {
    return range(len).map(d => {
        return {
            ...newSearch(),
            children: range(10).map(newSearch)
        };
    });
}

export function makeData3(len = 5553) {
    return range(len).map(d => {
        return {
            ...newSearch2(),
            children: range(10).map(newSearch2)
        };
    });
}

export function makeData4(len = 5553) {
    return range(len).map(d => {
        return {
            ...newSearch3(),
            children: range(10).map(newSearch3)
        };
    });
}
