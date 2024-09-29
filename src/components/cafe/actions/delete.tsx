import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import {faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { CustomCellRendererProps } from 'ag-grid-react';
import { ConfirmationDialog } from '../../../common/dialog';

library.add(faTrash);

export const DeleteCafeComponent = (params: CustomCellRendererProps) => {
    const [deleteModalOpen, setDeleteModelOpen] = useState<boolean>(false);
    return (
      <>
        <ConfirmationDialog
          title='Delete the cafe?'
          content={"Are you sure you want to delete the cafe: " + params.data.name}
          open={deleteModalOpen}
          setOpen={setDeleteModelOpen}
        ></ConfirmationDialog>
        <FontAwesomeIcon onClick={() => setDeleteModelOpen(true)} icon="fa-trash" style={{ color: "#cc0000" }} />
      </>
    );
  };
