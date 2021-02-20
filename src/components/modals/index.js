import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const modals = {
  add: AddChannel,
  remove: RemoveChannel,
  rename: RenameChannel,
};

export default (modalName) => modals[modalName];
