import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import BlogPost from "@/pages/BlogPost";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminLeads from "@/pages/admin/Leads";
import AdminBlogList from "@/pages/admin/BlogList";
import AdminBlogEditor from "@/pages/admin/BlogEditor";
import AdminContentManagement from "@/pages/admin/ContentManagement";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/leads" component={AdminLeads} />
      <Route path="/admin/blog" component={AdminBlogList} />
      <Route path="/admin/blog/new" component={AdminBlogEditor} />
      <Route path="/admin/blog/edit/:id" component={AdminBlogEditor} />
      <Route path="/admin/content" component={AdminContentManagement} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
