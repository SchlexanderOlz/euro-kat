import PocketBase from 'pocketbase';

const pb = new PocketBase('https://ek.krenn.tech/');

async function add() {
	await pb.admins.authWithPassword('admin@admin.admin', 'Kennwort1!');
    let country = new FormData();
    let figure = new FormData();
    country.append('countryName', 'Austria');
    figure.append('mpgNr', '1234');
    figure.append('figureName', 'TestFigure');
    figure.append('fake', 'true');


    await pb.collection('Country').create(country);
    await pb.collection('Figure').create(figure);
}

add();
