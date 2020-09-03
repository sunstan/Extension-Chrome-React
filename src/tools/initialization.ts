import Config from '../app/core/services/config.service';
import Actions from '../app/core/services/actions.service';
import Storage from '../app/core/services/storage.service';

Actions.addOnInstalledListener(async () => {
    await Storage.setItem('notify', true);
    await Storage.setItem('notified', false);
});

Actions.addOnStartupListener(async () => {
    await Storage.setItem('notified', false);
});

Actions.addNotificationsOnClickedListener(async () => {
    const url = await Config.getChannelUrl();
    await Actions.createTab(url);
});
