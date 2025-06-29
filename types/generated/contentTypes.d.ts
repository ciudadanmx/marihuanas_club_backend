import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    roles: Attribute.JSON;
    prueba: Attribute.Text;
    id_stripe: Attribute.String;
    fecha_registro: Attribute.DateTime;
    membresia_vigente: Attribute.Boolean;
    tipo_membresia: Attribute.Enumeration<
      ['mensual', 'semestral', 'anual', 'preferente']
    >;
    fecha_nacimiento: Attribute.DateTime;
    fecha_membresia: Attribute.DateTime;
    telefono: Attribute.String;
    cp: Attribute.String;
    ine_frente: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    ine_tras: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    foto_credencial: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    nombre_completo: Attribute.String;
    fecha_fin_membresia_actual: Attribute.Date;
    stripeCustomerId: Attribute.String;
    stripeSubscriptionId: Attribute.String;
    stripePriceId: Attribute.String;
    subscriptionStatus: Attribute.Enumeration<
      ['active', 'canceled', 'incomplete']
    >;
    direcciones: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::direccion.direccion'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAA extends Schema.CollectionType {
  collectionName: 'as';
  info: {
    singularName: 'a';
    pluralName: 'as';
    displayName: 'a';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    a: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::a.a', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::a.a', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiCarritoCarrito extends Schema.CollectionType {
  collectionName: 'carritos';
  info: {
    singularName: 'carrito';
    pluralName: 'carritos';
    displayName: 'carritos';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    usuario: Attribute.Relation<
      'api::carrito.carrito',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    productos: Attribute.Component<'carritos.producto-en-carrito', true>;
    total: Attribute.Decimal;
    estado: Attribute.Enumeration<['activo', 'pendiente_pago', 'pagado']>;
    ultima_actualizacion: Attribute.DateTime;
    log: Attribute.JSON;
    direccion: Attribute.Relation<
      'api::carrito.carrito',
      'oneToOne',
      'api::direccion.direccion'
    >;
    total_envios: Attribute.Decimal;
    agrupacion_de_envios: Attribute.JSON;
    usuario_email: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::carrito.carrito',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::carrito.carrito',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCarteraCartera extends Schema.CollectionType {
  collectionName: 'carteras';
  info: {
    singularName: 'cartera';
    pluralName: 'carteras';
    displayName: 'Cartera';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    laborysGanados: Attribute.Decimal;
    laborysSaldo: Attribute.Decimal;
    ciudadanTokens: Attribute.Decimal;
    ciudadanRendimientos: Attribute.Decimal;
    user_id: Attribute.Relation<
      'api::cartera.cartera',
      'oneToOne',
      'admin::user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::cartera.cartera',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::cartera.cartera',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoriaContenidoCategoriaContenido
  extends Schema.CollectionType {
  collectionName: 'categorias_contenidos';
  info: {
    singularName: 'categoria-contenido';
    pluralName: 'categorias-contenidos';
    displayName: 'Categorias_Contenidos';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String;
    activa: Attribute.Boolean;
    imagen: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    slug: Attribute.String;
    descripcion: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::categoria-contenido.categoria-contenido',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::categoria-contenido.categoria-contenido',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoriaCursoCategoriaCurso extends Schema.CollectionType {
  collectionName: 'categorias_cursos';
  info: {
    singularName: 'categoria-curso';
    pluralName: 'categorias-cursos';
    displayName: 'categorias_cursos';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String;
    nivel: Attribute.Integer;
    sup: Attribute.Integer;
    descripcion: Attribute.Text;
    imagen: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    slug: Attribute.String;
    activa: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::categoria-curso.categoria-curso',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::categoria-curso.categoria-curso',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoriaEnlaceCategoriaEnlace
  extends Schema.CollectionType {
  collectionName: 'categorias_enlaces';
  info: {
    singularName: 'categoria-enlace';
    pluralName: 'categorias-enlaces';
    displayName: 'Categorias_Enlaces';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titulo: Attribute.String;
    descripcion: Attribute.Text;
    nivel: Attribute.Integer;
    sup: Attribute.Integer;
    activa: Attribute.Boolean;
    imagen: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    slug: Attribute.UID;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::categoria-enlace.categoria-enlace',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::categoria-enlace.categoria-enlace',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoriaEventoCategoriaEvento
  extends Schema.CollectionType {
  collectionName: 'categorias_eventos';
  info: {
    singularName: 'categoria-evento';
    pluralName: 'categorias-eventos';
    displayName: 'Categorias_Eventos';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titulo: Attribute.String;
    descripcion: Attribute.Text;
    imagen: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    nivel: Attribute.Integer;
    sup: Attribute.Integer;
    slug: Attribute.UID;
    activa: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::categoria-evento.categoria-evento',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::categoria-evento.categoria-evento',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoriaHerramientaCategoriaHerramienta
  extends Schema.CollectionType {
  collectionName: 'categorias_herramientas';
  info: {
    singularName: 'categoria-herramienta';
    pluralName: 'categorias-herramientas';
    displayName: 'Categorias_Herramientas';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titulo: Attribute.String;
    descripcion: Attribute.Text;
    slug: Attribute.UID;
    imagen: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    nivel: Attribute.Integer;
    sup: Attribute.Integer;
    activa: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::categoria-herramienta.categoria-herramienta',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::categoria-herramienta.categoria-herramienta',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiClubClub extends Schema.CollectionType {
  collectionName: 'clubs';
  info: {
    singularName: 'club';
    pluralName: 'clubs';
    displayName: 'Clubs';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    nombre_club: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    direccion: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    lat: Attribute.Float &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    lng: Attribute.Float &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    nombre_titular: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    status_legal: Attribute.Integer &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    archivos_legal: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    foto_de_perfil: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    fotos: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    descripcion: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    servicios: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    users_permissions_user: Attribute.Relation<
      'api::club.club',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    auth_name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    horarios: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    whatsapp: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    activo: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    tipo: Attribute.Enumeration<['cultivo', 'consumo', 'ambos']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::club.club', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::club.club', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::club.club',
      'oneToMany',
      'api::club.club'
    >;
    locale: Attribute.String;
  };
}

export interface ApiComentarioPublicacionComentarioPublicacion
  extends Schema.CollectionType {
  collectionName: 'comentarios_publicaciones';
  info: {
    singularName: 'comentario-publicacion';
    pluralName: 'comentarios-publicaciones';
    displayName: 'Comentarios_Publicaciones';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    comentario: Attribute.Text;
    autor: Attribute.Relation<
      'api::comentario-publicacion.comentario-publicacion',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    publicacion_id: Attribute.Relation<
      'api::comentario-publicacion.comentario-publicacion',
      'oneToOne',
      'api::publicacion.publicacion'
    >;
    timestamp: Attribute.DateTime;
    status: Attribute.Enumeration<['publicado', 'eliminado', 'bloqueado']>;
    imagen: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    respuesta: Attribute.Boolean;
    comentario_id: Attribute.Relation<
      'api::comentario-publicacion.comentario-publicacion',
      'oneToOne',
      'api::comentario-publicacion.comentario-publicacion'
    >;
    tipo: Attribute.Enumeration<
      ['publicacion', 'articulo', 'enlace', 'herramienta', 'evento']
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::comentario-publicacion.comentario-publicacion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::comentario-publicacion.comentario-publicacion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiConfiguracionSistemaConfiguracionSistema
  extends Schema.CollectionType {
  collectionName: 'configuraciones_sistemas';
  info: {
    singularName: 'configuracion-sistema';
    pluralName: 'configuraciones-sistemas';
    displayName: 'Configuraciones_Sistema';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    basic_set: Attribute.JSON;
    datos_generales: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::configuracion-sistema.configuracion-sistema',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::configuracion-sistema.configuracion-sistema',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiConfiguracionUsuarioConfiguracionUsuario
  extends Schema.CollectionType {
  collectionName: 'configuraciones_usuarios';
  info: {
    singularName: 'configuracion-usuario';
    pluralName: 'configuraciones-usuarios';
    displayName: 'configuraciones_usuarios';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    usuario: Attribute.Relation<
      'api::configuracion-usuario.configuracion-usuario',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    email: Attribute.Email;
    configuraciones: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::configuracion-usuario.configuracion-usuario',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::configuracion-usuario.configuracion-usuario',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContenidoContenido extends Schema.CollectionType {
  collectionName: 'contenidos';
  info: {
    singularName: 'contenido';
    pluralName: 'contenidos';
    displayName: 'Contenidos';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titulo: Attribute.String;
    slug: Attribute.UID;
    autor: Attribute.Relation<
      'api::contenido.contenido',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    contenido_libre: Attribute.JSON;
    contenido_restringido: Attribute.JSON;
    restringido: Attribute.Boolean;
    status: Attribute.Enumeration<['borrador', 'publicado', 'archivado']>;
    portada: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    galeria_libre: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    galeria_restringida: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    tags: Attribute.Text;
    fecha_publicacion: Attribute.DateTime;
    resumen: Attribute.String;
    categoria: Attribute.Relation<
      'api::contenido.contenido',
      'oneToOne',
      'api::categoria-contenido.categoria-contenido'
    >;
    autor_email: Attribute.String;
    autor_nombre: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contenido.contenido',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contenido.contenido',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCursoCurso extends Schema.CollectionType {
  collectionName: 'cursos';
  info: {
    singularName: 'curso';
    pluralName: 'cursos';
    displayName: 'Cursos';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titulo: Attribute.String;
    modalidad: Attribute.Enumeration<
      [
        'presencial',
        'en l\u00EDnea tiempo real',
        'en l\u00EDnea grabaciones',
        'h\u00EDbrido'
      ]
    >;
    certificacion: Attribute.String;
    precio: Attribute.Decimal;
    descripcion: Attribute.Text;
    calendario_actividades: Attribute.JSON;
    maestro: Attribute.Relation<
      'api::curso.curso',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    portada: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    calificacion: Attribute.Integer;
    calificaciones: Attribute.Integer;
    creado_at: Attribute.DateTime;
    temario: Attribute.JSON;
    archivos: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    fecha_inicio: Attribute.DateTime;
    slug: Attribute.String;
    categoria_curso: Attribute.Relation<
      'api::curso.curso',
      'oneToOne',
      'api::categoria-curso.categoria-curso'
    >;
    de_pago: Attribute.Boolean;
    enlace_reunion: Attribute.String;
    enlaces_publicos: Attribute.JSON;
    enlaces_privados: Attribute.JSON;
    ubicacion: Attribute.Relation<
      'api::curso.curso',
      'oneToOne',
      'api::direccion.direccion'
    >;
    status: Attribute.Enumeration<
      ['borrador', 'activo', 'ya_encurso', 'eliminado', 'bloqueado']
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::curso.curso',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::curso.curso',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDireccionDireccion extends Schema.CollectionType {
  collectionName: 'direcciones';
  info: {
    singularName: 'direccion';
    pluralName: 'direcciones';
    displayName: 'Direcciones';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    direccion: Attribute.JSON;
    coords: Attribute.JSON;
    cp: Attribute.String;
    ciudad: Attribute.String;
    estado: Attribute.String;
    user_email: Attribute.Email;
    store_id: Attribute.Relation<
      'api::direccion.direccion',
      'oneToOne',
      'api::store.store'
    >;
    observaciones: Attribute.String;
    event_id: Attribute.Relation<
      'api::direccion.direccion',
      'oneToOne',
      'api::evento.evento'
    >;
    activa: Attribute.Boolean;
    club: Attribute.Relation<
      'api::direccion.direccion',
      'oneToOne',
      'api::club.club'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::direccion.direccion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::direccion.direccion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDriverLocationDriverLocation extends Schema.CollectionType {
  collectionName: 'driver_locations';
  info: {
    singularName: 'driver-location';
    pluralName: 'driver-locations';
    displayName: 'DriverLocations';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    coords: Attribute.JSON;
    driver_id: Attribute.Relation<
      'api::driver-location.driver-location',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    time: Attribute.DateTime;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::driver-location.driver-location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::driver-location.driver-location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEnlaceEnlace extends Schema.CollectionType {
  collectionName: 'enlaces';
  info: {
    singularName: 'enlace';
    pluralName: 'enlaces';
    displayName: 'Enlaces';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titulo: Attribute.String;
    url: Attribute.String;
    timestamp: Attribute.DateTime;
    descripcion: Attribute.Text;
    calificacion: Attribute.Integer;
    calificaciones: Attribute.Integer;
    autor: Attribute.Relation<
      'api::enlace.enlace',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    imagen: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    status: Attribute.Enumeration<
      ['borrador', 'publicado', 'eliminado', 'bloqueado']
    >;
    enlace_id: Attribute.Relation<
      'api::enlace.enlace',
      'oneToOne',
      'api::enlace.enlace'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::enlace.enlace',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::enlace.enlace',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEventoEvento extends Schema.CollectionType {
  collectionName: 'eventos';
  info: {
    singularName: 'evento';
    pluralName: 'eventos';
    displayName: 'Eventos';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titulo: Attribute.String;
    slug: Attribute.UID;
    descripcion: Attribute.Blocks;
    creador: Attribute.Relation<
      'api::evento.evento',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    colaboradores: Attribute.JSON;
    portada: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    imagenes: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    de_pago: Attribute.Boolean;
    precio: Attribute.Decimal;
    ciudad: Attribute.String;
    estado: Attribute.String;
    multifecha: Attribute.Boolean;
    fecha_inicio: Attribute.Date;
    hora_inicio: Attribute.Time;
    fechas_horarios_adicionales: Attribute.JSON;
    fecha_fin: Attribute.Date;
    hora_fin: Attribute.Time;
    modalidad: Attribute.Enumeration<
      ['presencial', 'en l\u00EDnea', 'h\u00EDbrido']
    >;
    status: Attribute.String;
    direccion: Attribute.Relation<
      'api::evento.evento',
      'oneToOne',
      'api::direccion.direccion'
    >;
    evento_id: Attribute.Relation<
      'api::evento.evento',
      'oneToOne',
      'api::evento.evento'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::evento.evento',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::evento.evento',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGenWalletGenWallet extends Schema.CollectionType {
  collectionName: 'gen_wallets';
  info: {
    singularName: 'gen-wallet';
    pluralName: 'gen-wallets';
    displayName: 'GenWallet';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    WalletIdx: Attribute.String;
    Coin: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::gen-wallet.gen-wallet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::gen-wallet.gen-wallet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiListaSuscripcionListaSuscripcion
  extends Schema.CollectionType {
  collectionName: 'listas_suscripciones';
  info: {
    singularName: 'lista-suscripcion';
    pluralName: 'listas-suscripciones';
    displayName: 'listas_suscripciones';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    suscritos: Attribute.Relation<
      'api::lista-suscripcion.lista-suscripcion',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    tipo: Attribute.Enumeration<['curso', 'evento']>;
    curso: Attribute.Relation<
      'api::lista-suscripcion.lista-suscripcion',
      'oneToOne',
      'api::curso.curso'
    >;
    evento: Attribute.Relation<
      'api::lista-suscripcion.lista-suscripcion',
      'oneToOne',
      'api::evento.evento'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::lista-suscripcion.lista-suscripcion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::lista-suscripcion.lista-suscripcion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMembresiaMembresia extends Schema.CollectionType {
  collectionName: 'membresias';
  info: {
    singularName: 'membresia';
    pluralName: 'membresias';
    displayName: 'Membres\u00EDas';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    usuario: Attribute.Relation<
      'api::membresia.membresia',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    fechaInicio: Attribute.Date;
    fechaFin: Attribute.Date;
    plan: Attribute.Enumeration<['mensual,', 'semestreal,', 'anual']>;
    monto_pagado: Attribute.Decimal;
    activa: Attribute.Boolean;
    miembroDesde: Attribute.DateTime;
    observaciones: Attribute.String;
    status: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::membresia.membresia',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::membresia.membresia',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMessageMessage extends Schema.CollectionType {
  collectionName: 'messages';
  info: {
    singularName: 'message';
    pluralName: 'messages';
    displayName: 'messages';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    text: Attribute.Text;
    sender_id: Attribute.Relation<
      'api::message.message',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    receiver_id: Attribute.Relation<
      'api::message.message',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    timestamp: Attribute.DateTime;
    status: Attribute.Enumeration<
      ['enviado', 'recibido', 'leido', 'bloqueado', 'eliminado']
    >;
    archivos: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::message.message',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::message.message',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNotificacionNotificacion extends Schema.CollectionType {
  collectionName: 'notificaciones';
  info: {
    singularName: 'notificacion';
    pluralName: 'notificaciones';
    displayName: 'Notificaciones';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    cuerpo: Attribute.Blocks;
    user_email: Attribute.String;
    usuario: Attribute.Relation<
      'api::notificacion.notificacion',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    timestamp: Attribute.DateTime;
    leida: Attribute.Boolean;
    status: Attribute.Enumeration<['entregada', 'leida', 'borrada']>;
    tipo: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::notificacion.notificacion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::notificacion.notificacion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPagoPago extends Schema.CollectionType {
  collectionName: 'pagos';
  info: {
    singularName: 'pago';
    pluralName: 'pagos';
    displayName: 'Pagos';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Idx: Attribute.UID;
    tipo: Attribute.Enumeration<
      ['market', 'curso', 'evento', 'asesoria', 'servicio', 'membresia']
    >;
    carrito_id: Attribute.Relation<
      'api::pago.pago',
      'oneToOne',
      'api::carrito.carrito'
    >;
    curso_id: Attribute.Relation<
      'api::pago.pago',
      'oneToOne',
      'api::curso.curso'
    >;
    evento_id: Attribute.Relation<
      'api::pago.pago',
      'oneToOne',
      'api::evento.evento'
    >;
    fecha_pagado: Attribute.DateTime;
    usuario: Attribute.Relation<
      'api::pago.pago',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    monto: Attribute.Decimal;
    moneda: Attribute.String;
    stripePaymentIntentId: Attribute.String;
    stripeInvoiceId: Attribute.String;
    stripeCustomerId: Attribute.String;
    stripeSubscriptionId: Attribute.String;
    status: Attribute.String;
    descripcion: Attribute.String;
    metadata: Attribute.JSON;
    disputa: Attribute.Boolean;
    metodo_pago: Attribute.Enumeration<['stripe']>;
    Observaciones: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::pago.pago', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::pago.pago', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPedidoPedido extends Schema.CollectionType {
  collectionName: 'pedidos';
  info: {
    singularName: 'pedido';
    pluralName: 'pedidos';
    displayName: 'pedidos';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    item: Attribute.Component<'carritos.producto-en-carrito', true>;
    tipo: Attribute.Enumeration<['tienda', 'curso', 'evento', 'asesoria']>;
    curso_id: Attribute.Relation<
      'api::pedido.pedido',
      'oneToOne',
      'api::curso.curso'
    >;
    evento_id: Attribute.Relation<
      'api::pedido.pedido',
      'oneToOne',
      'api::evento.evento'
    >;
    timestamp_creacion: Attribute.DateTime;
    usuario: Attribute.Relation<
      'api::pedido.pedido',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    guia: Attribute.String;
    proveedor: Attribute.Enumeration<
      [
        'Estafeta',
        'FedEx',
        'DHL',
        'Redpack',
        'Paquetexpress',
        'Sendex',
        'iVoy',
        'Quiken',
        'Carssa'
      ]
    >;
    direccion_origen: Attribute.Relation<
      'api::pedido.pedido',
      'oneToOne',
      'api::direccion.direccion'
    >;
    direccion_destino: Attribute.Relation<
      'api::pedido.pedido',
      'oneToOne',
      'api::direccion.direccion'
    >;
    fecha_envio: Attribute.DateTime;
    fecha_entrega: Attribute.DateTime;
    total_volumetrico: Attribute.Decimal;
    monto_envio: Attribute.Decimal;
    monto_total: Attribute.Decimal;
    carrito_id: Attribute.Relation<
      'api::pedido.pedido',
      'oneToOne',
      'api::carrito.carrito'
    >;
    fecha_pagado: Attribute.DateTime;
    moneda: Attribute.String;
    pago_id: Attribute.Relation<
      'api::pedido.pedido',
      'oneToOne',
      'api::pago.pago'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::pedido.pedido',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::pedido.pedido',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductoProducto extends Schema.CollectionType {
  collectionName: 'productos';
  info: {
    singularName: 'producto';
    pluralName: 'productos';
    displayName: 'productos';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String;
    descripcion: Attribute.String;
    precio: Attribute.Decimal;
    marca: Attribute.String;
    store_category: Attribute.Relation<
      'api::producto.producto',
      'oneToOne',
      'api::store-categorie.store-categorie'
    >;
    imagenes: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    imagen_predeterminada: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    activo: Attribute.Boolean;
    destacado: Attribute.Boolean;
    store_id: Attribute.String;
    store_email: Attribute.String;
    store: Attribute.Relation<
      'api::producto.producto',
      'oneToOne',
      'api::store.store'
    >;
    stripe_product_id: Attribute.String;
    tags: Attribute.Text;
    fecha_creacion: Attribute.DateTime;
    stock: Attribute.Float;
    calificacion: Attribute.Integer;
    calificaciones: Attribute.Integer;
    vendidos: Attribute.Integer;
    cp: Attribute.String;
    slug: Attribute.String;
    largo: Attribute.Decimal;
    ancho: Attribute.Decimal;
    alto: Attribute.Decimal;
    peso: Attribute.Decimal;
    volumetrico: Attribute.Decimal;
    especificaciones: Attribute.JSON;
    variaciones: Attribute.JSON;
    localidad: Attribute.String;
    estado: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::producto.producto',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::producto.producto',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPublicacionPublicacion extends Schema.CollectionType {
  collectionName: 'publicaciones';
  info: {
    singularName: 'publicacion';
    pluralName: 'publicaciones';
    displayName: 'Publicaciones';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    contenido: Attribute.Blocks;
    autor: Attribute.Relation<
      'api::publicacion.publicacion',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    archivos: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    timestamp: Attribute.DateTime;
    publicado: Attribute.Enumeration<
      ['publicado', 'borrador', 'eliminado', 'bloqueado']
    >;
    uid: Attribute.UID;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::publicacion.publicacion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::publicacion.publicacion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiReaccionReaccion extends Schema.CollectionType {
  collectionName: 'reacciones';
  info: {
    singularName: 'reaccion';
    pluralName: 'reacciones';
    displayName: 'Reacciones';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    listado: Attribute.JSON;
    tipo: Attribute.Enumeration<
      ['publicacion', 'articulo', 'enlace', 'herramienta', 'evento']
    >;
    comentario: Attribute.Boolean;
    respuesta: Attribute.Boolean;
    evento_id: Attribute.Relation<
      'api::reaccion.reaccion',
      'oneToOne',
      'api::evento.evento'
    >;
    enlace_id: Attribute.Relation<
      'api::reaccion.reaccion',
      'oneToOne',
      'api::enlace.enlace'
    >;
    comentario_id: Attribute.Relation<
      'api::reaccion.reaccion',
      'oneToOne',
      'api::comentario-publicacion.comentario-publicacion'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::reaccion.reaccion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::reaccion.reaccion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiResenaResena extends Schema.CollectionType {
  collectionName: 'resenas';
  info: {
    singularName: 'resena';
    pluralName: 'resenas';
    displayName: 'resenas';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    usuario: Attribute.Relation<
      'api::resena.resena',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    producto: Attribute.Relation<
      'api::resena.resena',
      'oneToOne',
      'api::producto.producto'
    >;
    comentario: Attribute.Text;
    timestamp: Attribute.DateTime;
    carrito: Attribute.Relation<
      'api::resena.resena',
      'oneToOne',
      'api::carrito.carrito'
    >;
    curso_id: Attribute.Relation<
      'api::resena.resena',
      'oneToOne',
      'api::curso.curso'
    >;
    club_id: Attribute.Relation<
      'api::resena.resena',
      'oneToOne',
      'api::club.club'
    >;
    status: Attribute.Enumeration<['publicada', 'eliminada', 'bloqueada']>;
    observaciones: Attribute.Text;
    evento_id: Attribute.Relation<
      'api::resena.resena',
      'oneToOne',
      'api::evento.evento'
    >;
    tipo: Attribute.Enumeration<
      ['producto', 'club', 'curso', 'evento', 'enlace', 'recurso']
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::resena.resena',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::resena.resena',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiServicioServicio extends Schema.CollectionType {
  collectionName: 'servicios';
  info: {
    singularName: 'servicio';
    pluralName: 'servicios';
    displayName: 'Servicios';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titulo: Attribute.String;
    descripcion: Attribute.Text;
    imagen: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    precio_fijo: Attribute.Boolean;
    precio: Attribute.Decimal;
    prestador: Attribute.Relation<
      'api::servicio.servicio',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    slug: Attribute.UID;
    descripcion_precio: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::servicio.servicio',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::servicio.servicio',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStoreStore extends Schema.CollectionType {
  collectionName: 'stores';
  info: {
    singularName: 'store';
    pluralName: 'stores';
    displayName: 'Stores';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    users_permissions_user: Attribute.Relation<
      'api::store.store',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    email: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    stripeAccountId: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    stripeOnboarded: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    stripeChargesEnabled: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    stripePayoutsEnabled: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    terminado: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    slug: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    direccion: Attribute.Relation<
      'api::store.store',
      'oneToOne',
      'api::direccion.direccion'
    >;
    cp: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    localidad: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    esquema_impuestos: Attribute.Enumeration<
      ['sin_iva', 'con_iva', 'optativo']
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::store.store',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::store.store',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::store.store',
      'oneToMany',
      'api::store.store'
    >;
    locale: Attribute.String;
  };
}

export interface ApiStoreCategorieStoreCategorie extends Schema.CollectionType {
  collectionName: 'store_categories';
  info: {
    singularName: 'store-categorie';
    pluralName: 'store-categories';
    displayName: 'store-categories';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String;
    descripcion: Attribute.Text;
    imagen: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    slug: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::store-categorie.store-categorie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::store-categorie.store-categorie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWorldCoinWalletWorldCoinWallet
  extends Schema.CollectionType {
  collectionName: 'world_coin_wallets';
  info: {
    singularName: 'world-coin-wallet';
    pluralName: 'world-coin-wallets';
    displayName: 'WorldCoinWallet';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    CarteraIdx: Attribute.String;
    ammount: Attribute.Decimal;
    user_idd: Attribute.Relation<
      'api::world-coin-wallet.world-coin-wallet',
      'oneToOne',
      'admin::user'
    >;
    genesis: Attribute.Boolean;
    user_id: Attribute.Email;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::world-coin-wallet.world-coin-wallet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::world-coin-wallet.world-coin-wallet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::a.a': ApiAA;
      'api::carrito.carrito': ApiCarritoCarrito;
      'api::cartera.cartera': ApiCarteraCartera;
      'api::categoria-contenido.categoria-contenido': ApiCategoriaContenidoCategoriaContenido;
      'api::categoria-curso.categoria-curso': ApiCategoriaCursoCategoriaCurso;
      'api::categoria-enlace.categoria-enlace': ApiCategoriaEnlaceCategoriaEnlace;
      'api::categoria-evento.categoria-evento': ApiCategoriaEventoCategoriaEvento;
      'api::categoria-herramienta.categoria-herramienta': ApiCategoriaHerramientaCategoriaHerramienta;
      'api::club.club': ApiClubClub;
      'api::comentario-publicacion.comentario-publicacion': ApiComentarioPublicacionComentarioPublicacion;
      'api::configuracion-sistema.configuracion-sistema': ApiConfiguracionSistemaConfiguracionSistema;
      'api::configuracion-usuario.configuracion-usuario': ApiConfiguracionUsuarioConfiguracionUsuario;
      'api::contenido.contenido': ApiContenidoContenido;
      'api::curso.curso': ApiCursoCurso;
      'api::direccion.direccion': ApiDireccionDireccion;
      'api::driver-location.driver-location': ApiDriverLocationDriverLocation;
      'api::enlace.enlace': ApiEnlaceEnlace;
      'api::evento.evento': ApiEventoEvento;
      'api::gen-wallet.gen-wallet': ApiGenWalletGenWallet;
      'api::lista-suscripcion.lista-suscripcion': ApiListaSuscripcionListaSuscripcion;
      'api::membresia.membresia': ApiMembresiaMembresia;
      'api::message.message': ApiMessageMessage;
      'api::notificacion.notificacion': ApiNotificacionNotificacion;
      'api::pago.pago': ApiPagoPago;
      'api::pedido.pedido': ApiPedidoPedido;
      'api::producto.producto': ApiProductoProducto;
      'api::publicacion.publicacion': ApiPublicacionPublicacion;
      'api::reaccion.reaccion': ApiReaccionReaccion;
      'api::resena.resena': ApiResenaResena;
      'api::servicio.servicio': ApiServicioServicio;
      'api::store.store': ApiStoreStore;
      'api::store-categorie.store-categorie': ApiStoreCategorieStoreCategorie;
      'api::world-coin-wallet.world-coin-wallet': ApiWorldCoinWalletWorldCoinWallet;
    }
  }
}
