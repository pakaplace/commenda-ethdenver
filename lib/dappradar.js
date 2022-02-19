export const getGames = async () => {
  const link1 = 'https://dappradar.com/v2/api/dapps?params=UkdGd2NGSmhaR0Z5Y0dGblpUMHhKbk5uY205MWNEMXRZWGdtWTNWeWNtVnVZM2s5VlZORUptWmxZWFIxY21Wa1BURW1jbUZ1WjJVOVpHRjVKbU5oZEdWbmIzSjVQV2RoYldWekpuTnZjblE5ZFhObGNpWnZjbVJsY2oxa1pYTmpKbXhwYldsMFBUSTI=';
  const link2 = 'https://dappradar.com/v2/api/dapps?params=UkdGd2NGSmhaR0Z5Y0dGblpUMHlKbk5uY205MWNEMXRZWGdtWTNWeWNtVnVZM2s5VlZORUptWmxZWFIxY21Wa1BURW1jbUZ1WjJVOVpHRjVKbU5oZEdWbmIzSjVQV2RoYldWekpuTnZjblE5ZFhObGNpWnZjbVJsY2oxa1pYTmpKbXhwYldsMFBUSTI=';
  const res = await Promise.all([
    await fetch('https://dappradar.com/v2/api/dapps?params=UkdGd2NGSmhaR0Z5Y0dGblpUMHhKbk5uY205MWNEMXRZWGdtWTNWeWNtVnVZM2s5VlZORUptWmxZWFIxY21Wa1BURW1jbUZ1WjJVOVpHRjVKbU5oZEdWbmIzSjVQV2RoYldWekpuTnZjblE5ZFhObGNpWnZjbVJsY2oxa1pYTmpKbXhwYldsMFBUSTI=', {
      method: 'GET',
    }),
    await fetch('https://dappradar.com/v2/api/dapps?params=UkdGd2NGSmhaR0Z5Y0dGblpUMHlKbk5uY205MWNEMXRZWGdtWTNWeWNtVnVZM2s5VlZORUptWmxZWFIxY21Wa1BURW1jbUZ1WjJVOVpHRjVKbU5oZEdWbmIzSjVQV2RoYldWekpuTnZjblE5ZFhObGNpWnZjbVJsY2oxa1pYTmpKbXhwYldsMFBUSTI=', {
      method: 'GET',
    }),
  ]);
  const json = await Promise.all([
    await res[0].json(),
    await res[1].json(),
  ]);

  const concat = json[0].dapps.concat(json[1].dapps);
  return concat;
};
