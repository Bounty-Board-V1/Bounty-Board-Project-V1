/* eslint-disable react/prop-types */
import { DialogWrapper } from "../../../components/ui/dialog-wrapper";
import { Button } from "@/components/ui/button";

export function DeleteUserDialog({ isOpen, onClose, onDeleteUser, userId }) {
  const handleDelete = () => {
    onDeleteUser(userId);
    onClose();
  };

  return (
    <DialogWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Deletion"
      footer={
        <>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Delete User
          </Button>
        </>
      }
    >
      <p>
        Are you sure you want to delete this user? This action cannot be undone.
      </p>
    </DialogWrapper>
  );
}
