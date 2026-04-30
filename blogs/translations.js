/**
 * i18n Translations for Blog Module
 * Bilingual support (English & French)
 * 
 * Usage in components:
 * const { t } = useTranslation('blogs');
 * Then use: t('blogs.listing.title')
 */

export const blogTranslations = {
  en: {
    blogs: {
      // Blog Listing Page
      listing: {
        title: "Latest Insights & Articles",
        subtitle: "Discover in-depth articles on fintech innovation, security, and growth strategies",
        searchPlaceholder: "Search articles...",
        filterLabel: "Filter by category",
        filterAll: "All Articles",
        sortLabel: "Sort by",
        sortNewest: "Newest First",
        sortOldest: "Oldest First",
        sortPopular: "Most Read",
        resultsFound: "articles found",
        noResults: "No articles found matching your criteria",
        pagination: {
          previous: "Previous",
          next: "Next",
          pageOf: "Page {{current}} of {{total}}",
        },
        featured: "Featured",
      },

      // Blog Detail Page
      detail: {
        backToBlogs: "← Back to Articles",
        author: "By {{name}}",
        role: "{{role}}",
        publishedOn: "Published on {{date}}",
        updatedOn: "Updated on {{date}}",
        readingTime: "{{minutes}} min read",
        shareArticle: "Share Article",
        tableOfContents: "Table of Contents",
        relatedArticles: "Related Articles",
        comments: "Comments",
        leaveComment: "Leave a Comment",
        commentPlaceholder: "Share your thoughts...",
        commentAuthor: "Your Name",
        commentEmail: "Email (not published)",
        submitComment: "Post Comment",
        noComments: "No comments yet. Be the first!",
        mediaGallery: "Media Gallery",
        downloadArticle: "Download as PDF",
        printArticle: "Print Article",
      },

      // Blog Categories
      categories: {
        product: "Product",
        engineering: "Engineering",
        growth: "Growth",
        security: "Security",
        design: "Design",
        culture: "Culture",
      },

      // Blog Card (from homepage)
      card: {
        readArticle: "Read Article",
        minutes: "min read",
      },

      // Blog Dashboard/Admin
      dashboard: {
        title: "Blog Management",
        createNew: "Create New Article",
        editArticle: "Edit Article",
        deleteArticle: "Delete Article",
        publishArticle: "Publish Article",
        saveDraft: "Save as Draft",
        articles: "Articles",
        status: "Status",
        actions: "Actions",
        edit: "Edit",
        delete: "Delete",
        preview: "Preview",
        confirmDelete: "Are you sure you want to delete this article?",
        deletedSuccessfully: "Article deleted successfully",
        publishedSuccessfully: "Article published successfully",
        savedSuccessfully: "Article saved successfully",
        errorSaving: "Error saving article",
      },

      // Empty States
      empty: {
        noArticles: "No articles yet",
        startWriting: "Start writing your first article",
        noSearchResults: "No articles match your search",
        tryOtherKeywords: "Try different keywords or filters",
      },

      // Errors
      errors: {
        loadingFailed: "Failed to load articles",
        notFound: "Article not found",
        tryAgain: "Try Again",
      },
    },
  },

  fr: {
    blogs: {
      // Page de liste des blogs
      listing: {
        title: "Derniers Articles et Idées",
        subtitle: "Découvrez des articles approfondis sur l'innovation fintech, la sécurité et les stratégies de croissance",
        searchPlaceholder: "Rechercher des articles...",
        filterLabel: "Filtrer par catégorie",
        filterAll: "Tous les articles",
        sortLabel: "Trier par",
        sortNewest: "Plus récent d'abord",
        sortOldest: "Plus ancien d'abord",
        sortPopular: "Plus lu",
        resultsFound: "articles trouvés",
        noResults: "Aucun article trouvé selon vos critères",
        pagination: {
          previous: "Précédent",
          next: "Suivant",
          pageOf: "Page {{current}} de {{total}}",
        },
        featured: "En vedette",
      },

      // Page de détail du blog
      detail: {
        backToBlogs: "← Retour aux articles",
        author: "Par {{name}}",
        role: "{{role}}",
        publishedOn: "Publié le {{date}}",
        updatedOn: "Mis à jour le {{date}}",
        readingTime: "{{minutes}} min de lecture",
        shareArticle: "Partager l'article",
        tableOfContents: "Table des matières",
        relatedArticles: "Articles connexes",
        comments: "Commentaires",
        leaveComment: "Laisser un commentaire",
        commentPlaceholder: "Partagez votre avis...",
        commentAuthor: "Votre nom",
        commentEmail: "E-mail (non publié)",
        submitComment: "Publier le commentaire",
        noComments: "Aucun commentaire pour le moment. Soyez le premier !",
        mediaGallery: "Galerie de médias",
        downloadArticle: "Télécharger en PDF",
        printArticle: "Imprimer l'article",
      },

      // Catégories de blog
      categories: {
        product: "Produit",
        engineering: "Ingénierie",
        growth: "Croissance",
        security: "Sécurité",
        design: "Conception",
        culture: "Culture",
      },

      // Carte de blog (depuis la page d'accueil)
      card: {
        readArticle: "Lire l'article",
        minutes: "min de lecture",
      },

      // Tableau de bord de blog / Admin
      dashboard: {
        title: "Gestion des articles",
        createNew: "Créer un nouvel article",
        editArticle: "Modifier l'article",
        deleteArticle: "Supprimer l'article",
        publishArticle: "Publier l'article",
        saveDraft: "Enregistrer comme brouillon",
        articles: "Articles",
        status: "Statut",
        actions: "Actions",
        edit: "Modifier",
        delete: "Supprimer",
        preview: "Aperçu",
        confirmDelete: "Êtes-vous sûr de vouloir supprimer cet article ?",
        deletedSuccessfully: "Article supprimé avec succès",
        publishedSuccessfully: "Article publié avec succès",
        savedSuccessfully: "Article enregistré avec succès",
        errorSaving: "Erreur lors de l'enregistrement de l'article",
      },

      // États vides
      empty: {
        noArticles: "Aucun article pour le moment",
        startWriting: "Commencez à écrire votre premier article",
        noSearchResults: "Aucun article ne correspond à votre recherche",
        tryOtherKeywords: "Essayez d'autres mots-clés ou filtres",
      },

      // Erreurs
      errors: {
        loadingFailed: "Erreur lors du chargement des articles",
        notFound: "Article non trouvé",
        tryAgain: "Réessayer",
      },
    },
  },
};
