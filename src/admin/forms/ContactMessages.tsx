import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { MessageSquare, Loader2, Mail } from "lucide-react";
import { db } from "@/lib/firebase";
import { 
  collection, 
  query, 
  orderBy, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  createdAt: any;
  read: boolean;
  status?: 'new' | 'read' | 'responded';
}

const ContactMessages = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentMessage, setCurrentMessage] = useState<ContactMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch messages from Firebase
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const fetchedMessages: ContactMessage[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedMessages.push({
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          subject: data.subject || 'Contact Form Submission',
          message: data.message || '',
          phone: data.phone || '',
          createdAt: data.createdAt,
          read: data.status === 'read' || data.status === 'responded',
          status: data.status || 'new'
        });
      });
      
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load contact messages',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMessages = messages.filter(message => {
    const query = searchQuery.toLowerCase();
    return (
      message.name.toLowerCase().includes(query) ||
      message.email.toLowerCase().includes(query) ||
      (message.subject && message.subject.toLowerCase().includes(query)) ||
      message.message.toLowerCase().includes(query)
    );
  });

  const handleSelectMessage = (id: string) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages(selectedMessages.filter(messageId => messageId !== id));
    } else {
      setSelectedMessages([...selectedMessages, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedMessages.length === filteredMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(filteredMessages.map(message => message.id));
    }
  };

  const handleMarkAsRead = async (ids: string[]) => {
    try {
      // Update in Firebase
      for (const id of ids) {
        const messageRef = doc(db, 'contacts', id);
        await updateDoc(messageRef, {
          status: 'read'
        });
      }

      // Update local state
      setMessages(messages.map(message => 
        ids.includes(message.id) 
          ? { ...message, read: true, status: 'read' } 
          : message
      ));
      
      if (currentMessage && ids.includes(currentMessage.id)) {
        setCurrentMessage({ ...currentMessage, read: true, status: 'read' });
      }

      toast({
        title: "Success",
        description: `${ids.length} message(s) marked as read`
      });
    } catch (error) {
      console.error('Error marking messages as read:', error);
      toast({
        title: 'Error',
        description: 'Failed to update message status',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (ids: string[]) => {
    try {
      // Delete from Firebase
      for (const id of ids) {
        await deleteDoc(doc(db, 'contacts', id));
      }

      // Update local state
      setMessages(messages.filter(message => !ids.includes(message.id)));
      setSelectedMessages(selectedMessages.filter(id => !ids.includes(id)));
      
      if (currentMessage && ids.includes(currentMessage.id)) {
        setCurrentMessage(null);
      }

      toast({
        title: "Success",
        description: `${ids.length} message(s) deleted`
      });
    } catch (error) {
      console.error('Error deleting messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete messages',
        variant: 'destructive'
      });
    }
  };

  const handleViewMessage = async (message: ContactMessage) => {
    setCurrentMessage(message);
    
    if (!message.read) {
      await handleMarkAsRead([message.id]);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    
    try {
      const date = timestamp.toDate();
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Contact Messages</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
          <Button variant="outline" onClick={fetchMessages}>
            Refresh
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading messages...</span>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Messages List */}
          <Card className="w-full lg:w-3/5">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Messages</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{filteredMessages.length} Total</Badge>
                  <Badge variant="secondary">
                    {messages.filter(m => !m.read).length} Unread
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Manage contact form submissions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {filteredMessages.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedMessages.length === filteredMessages.length && filteredMessages.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Subject</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMessages.map((message) => (
                      <TableRow 
                        key={message.id} 
                        className={`cursor-pointer ${!message.read ? 'font-medium' : ''}`}
                        onClick={() => handleViewMessage(message)}
                      >
                        <TableCell className="p-2" onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedMessages.includes(message.id)}
                            onCheckedChange={() => handleSelectMessage(message.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{message.name}</div>
                          <div className="text-xs text-muted-foreground">{message.email}</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{message.subject || 'Contact Form Submission'}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {formatDate(message.createdAt)}
                        </TableCell>
                        <TableCell>
                          {!message.read && (
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <MessageSquare className="h-10 w-10 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No messages found</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery ? "Try adjusting your search query." : "You haven't received any messages yet."}
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t p-3 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {selectedMessages.length} selected
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={selectedMessages.length === 0}
                  onClick={() => handleMarkAsRead(selectedMessages)}
                >
                  Mark as read
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={selectedMessages.length === 0}
                  onClick={() => handleDelete(selectedMessages)}
                >
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Message View */}
          <Card className="w-full lg:w-2/5">
            <CardHeader>
              <CardTitle>Message Details</CardTitle>
            </CardHeader>
            <CardContent>
              {currentMessage ? (
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">From</div>
                    <div>{currentMessage.name} &lt;{currentMessage.email}&gt;</div>
                  </div>
                  {currentMessage.phone && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Phone</div>
                      <div>{currentMessage.phone}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Subject</div>
                    <div>{currentMessage.subject || 'Contact Form Submission'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Date</div>
                    <div>{formatDate(currentMessage.createdAt)}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Status</div>
                    <div>
                      {currentMessage.status === 'new' && <Badge className="bg-blue-500">New</Badge>}
                      {currentMessage.status === 'read' && <Badge className="bg-yellow-500">Read</Badge>}
                      {currentMessage.status === 'responded' && <Badge className="bg-green-500">Responded</Badge>}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Message</div>
                    <p className="mt-1 whitespace-pre-wrap p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      {currentMessage.message}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <MessageSquare className="h-10 w-10 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No message selected</h3>
                  <p className="text-sm text-muted-foreground">
                    Select a message from the list to view its details.
                  </p>
                </div>
              )}
            </CardContent>
            {currentMessage && (
              <CardFooter className="border-t flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentMessage(null)}
                >
                  Close
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete([currentMessage.id])}
                >
                  Delete
                </Button>
                <a 
                  href={`mailto:${currentMessage.email}?subject=Re: ${currentMessage.subject || 'Contact Form Submission'}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Reply via Email
                  </Button>
                </a>
              </CardFooter>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
