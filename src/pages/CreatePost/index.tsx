import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import Markdown from "react-markdown";

const CreatePostPage = () => {
  const [content, setContent] = useState("");
  const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure();
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const removeTag = (tag: string) =>
    setTags((tags) => tags.filter((e) => e != tag));
  const addTag = (tag: string) => setTags((tags) => [...tags, tag]);

  return (
    <div className="max-auto">
      <h1 className="text-2xl justify-center text-center">Create new post</h1>

      <div className="mt-3">
        <Input type="text" label="Title" className="max-w-xs mb-2" />

        <div className="max-w flex mb-2">
          <Textarea
            label="Content"
            placeholder="Enter post content"
            className="max-w"
            onValueChange={(e) => setContent(e)}
            value={content}
          />
        </div>

        <Input
          type="text"
          label="Tags"
          className="max-w-xs mb-2"
          value={currentTag}
          onKeyDown={(e) => {
            if (e.key != "Enter") return;
            if (!currentTag.trim().length) return;
            addTag(currentTag);
            setCurrentTag("");
          }}
          onValueChange={e => setCurrentTag(e)}
        />

        <div className="max-w">
          {tags.map((tag) => (
            <Chip key={tag} onClose={() => removeTag(tag)} className="mb-1 mr-1" variant="flat">
              {tag}
            </Chip>
          ))}
        </div>

        <div className="mt-2">
          <Button color="primary" className="mr-1">
            Submit
          </Button>
          <Button variant="bordered" color="primary" onClick={onOpen}>
            Preview content
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onOpenChange}>
        <ModalContent>
          <ModalHeader>Content preview</ModalHeader>
          <ModalBody>{isOpen && <Markdown>{content}</Markdown>}</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );

  return <></>;
};

export default CreatePostPage;
